# proxy setting for nexe
# $env:HTTPS_PROXY = ""

npm run-script build
nexe out/smsgen.js -r src/*.yaml -r src/*.xml -o smsgen.exe
# nexe out/smsgen.js -r src/*.yaml -r src/*.xml -o smsgen.exe -b --target 10.16.0 
mkdir dist -ErrorAction Ignore
robocopy /MIR assets dist
cp README.md dist
cp LICENSE.txt dist
cp smsgen.exe dist
