# build
npm run-script build

# $env:HTTPS_PROXY = ""
# nexe out/smsgen.js -r src/*.yaml -r src/*.xml -o smsgen.exe
nexe out/smsgen.js -r src/*.yaml -r src/*.xml -o smsgen.exe --target 12.14.1
if ( $? -eq $false ){
	Write-Error "nexe"
	exit 1
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
