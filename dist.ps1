$name = "smsgen"

# build
npm run-script build

nexe "out/$name.js" -r src/*.yaml -r src/*.xml -o "$name.exe" --target 12.16.3
if ( $? -eq $false ){
	Write-Error "nexe"
	exit 1
}

# create distribution
mkdir dist -ErrorAction Ignore
robocopy /MIR assets dist
cp README.md dist
cp LICENSE.txt dist
cp "$name.exe" dist

# archive
mv dist $name
rm "$name.zip" -ErrorAction Ignore
compress-archive $name "$name.zip"
mv $name dist
