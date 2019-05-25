cd ..

$out = "test/out/args"

rm -Force -Recurse $out -ErrorAction Ignore
mkdir $out | out-null

node out/smsgen.js "in.yaml" "$out/args4.search-ms"
node out/smsgen.js "in.yaml"
cp in.search-ms "$out/args3.search-ms"

cd test
