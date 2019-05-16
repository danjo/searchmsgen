# $env:HTTPS_PROXY = "http://127.0.0.1:8888"

npm run-script build
nexe out/smsgen.js -r src/*.yaml -r src/*.xml -o smsgen.exe
mkdir dist -ErrorAction Ignore
robocopy /MIR assets dist
cp README.md dist
cp LICENSE.txt dist
cp smsgen.exe dist
