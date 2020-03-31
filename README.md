# searchmsgen

# Description
Windows .search-ms file generator.

.search-ms file used to save explorer.exe search query as a file.  
the file format is XML based text, but difficult to read/edit by hand.  
So the program intend to help creating .search-ms files by easyer way.

# Target Environments
## smsgen.exe
tested Windows10 1903 64bit

## generated .search-ms files
tested Windows10 64bit.  
may can use on Windows Vista or later.


# CLI Usage
1. smsgen.exe [input file] [output file]
2. smsgen.exe [input file]  
  for drag&drop. When drop "sample.yaml", generates as "sample.search-ms"

# Input File Format
YAML based text, is besed on:
- usually .search-ms XML format's tags/attributes maps to YAML
- for "conditions", using helper notations (like "size", "recent") to  
  write the structure.

samples below or other sample files are in "sample" directory.

## sample 1
required variables, minimal sample.  
"conditions" and "scopes" are required always.  
other variables are optional.

### readme_sample1.yaml
    conditions:
      picture
    scopes:
      - [ include, "c:/Users/someUser" ]

this query searches picture files in c:/Users/someUser

## sample 2
more detailed conditions, scopes

### readme_sample2.yaml
    conditions:
      date_recent: { days: 14 }
    scopes:
      - [ include, "c:/Users/someUser" ]
      - [ exclude, "c:/Users/someUser/AppData" ]
      - [ include, "d:/data", true ]

this query searches:
- file/folder updated recent 14 days.
- target folders are:
   - c:/Users/someUser, but excludes c:/Users/someUser/AppData
   - d:/data, but excepts subfolders alike d:/data/someFolder, d:/data/anyFolder  
     (3rd parameter "nonRecursive" set true).

## sample 3
optional variables.  
"viewMode", "iconSize", "columns", "sorts", and "kinds" can be either
skipping to use default value or settting specific one.

### readme_sample3.yaml
    viewMode:
      details
    iconSize:
      16
    columns:
      - { viewField: System.ItemNameDisplay }
      - { viewField: System.DateModified }
    sorts:
      - { viewField: System.DateModified, direction: descending }
    conditions:
      date_recent: { days: 14 }
    kinds:
      - item
    scopes:
      - [ include, "c:/Users/someUser", false ]

this query searches:
- search results displays with details view
- the view's colomns are itemNameDisplay, dateModified
- items sort by dateModified, descending order

these settings may ignored by exploler.exe, because exploler.exe
uses internally saved values, outside of .search-ms file.

## sample 4
more ditailed conditions, logical operation.  
conditions has tree structure, can present logical operation (and/or/not).

### readme_sample4.yaml
    viewMode:
      icons
    conditions:
      and:
        - picture
        - size: { comparator: gte, size: 1MiB }
        - not:
          - or
            - extension: { value: .gif }
            - extension: { value: .tiff }
    scopes:
      - [ include, "c:/Users/someUser" ]
      - [ exclude, "c:/Users/someUser/AppData" ]

this query searches:
- picture files, and...
- size greater equal than 1MiB, and...
- but excludes .gif, .tiff file extensions



# Conditions

## structure
conditions has tree structure

    conditions:
      and:
        - picture
        - size: { comparator: gte, size: 1MiB }
        - not:
          - or
            - extension: { value: .gif }
            - extension: { value: .tiff }

- conditions's element is just 1 condition operator
- condition operator is mapping (Hash)  or scalar (String)
- condition operator mapping's element is one of each below
  - child condition operators as sequence (Array)  
    and, or, not
  - parameters of itself as mapping  
    size, extension, ...
  - none  
    picture, ...

## condition oparators
### word

    word: { value: hello }

search by filename, file content


### extension

    extension: { value: .xlsx }

match file extension

### picture

    picture

picture sort files like .jpg, .png

### folder

    folder

folder sort items, folder, folder shortcut, zip...

### size

    size: { comparator: gte, size: 1MiB }

filesize compare  
parameters:
- comparator: string, gte, lte
- size: string, filesize, like 128, 100KB, 10MiB

### date_recent
    date_recent: { days: 14 }

recently updated, LastWriteTime

### date_between
    date_between: { start: 2018-01-01, end: 2018-12-31 }

updated between "start" and "end", LastWriteTime  

### and
    and: []

have few children operators

### or
    or: []

have few children operators

### not
    not: []

have just 1 child operator


# References

- [Saved Search File Format](https://docs.microsoft.com/en-us/windows/desktop/search/-search-savedsearchfileformat)
- [YAML](https://yaml.org/)
- [ejs](https://ejs.co/)
- [js-yaml](https://github.com/nodeca/js-yaml)

- [Change Search Results Default View Mode to Details instead of Content](https://www.winhelponline.com/blog/search-results-content-view-fix-details-windows-10/)
