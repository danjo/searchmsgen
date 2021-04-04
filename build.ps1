# build
npm run-script build
if ( $? -eq $false ){
	Write-Error "npm"
	exit 1
}

# $env:HTTPS_PROXY = ""
# https://github.com/nexe/nexe/releases/tag/v3.3.3
nexe out/smsgen.js -r src/*.yaml -r src/*.xml -o smsgen.exe --target windows-x64-14.15.3
if ( $? -eq $false ){
	Write-Error "nexe"
	exit 3
}

# create distribution
mkdir dist -ErrorAction Ignore
robocopy /MIR assets dist
cp README.md dist
cp LICENSE.txt dist
cp smsgen.exe dist

# archive
mv dist smsgen
rm smsgen.zip -ErrorAction Ignore
compress-archive smsgen smsgen.zip
mv smsgen dist
