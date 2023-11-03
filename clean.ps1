$name = "searchmsgen"

rm "$name.exe" -ErrorAction Ignore
rm "$name.zip" -ErrorAction Ignore
rm -Recurse -Force ./dist -ErrorAction Ignore
rm -Recurse -Force ./out -ErrorAction Ignore

rm -Recurse -Force ./node_modules -ErrorAction Ignore

rm ./out.search-ms -ErrorAction Ignore
rm -Recurse -Force ./test/out -ErrorAction Ignore


