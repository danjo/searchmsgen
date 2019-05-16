cd ..

$in = "test/in"
$out = "test/out"

rm -Force -Recurse $out -ErrorAction Ignore
mkdir $out | out-null

$bnames = $(Get-ChildItem $in/*.yaml | % { $_.BaseName } )
$bnames | % {
	$bname = $_
	write-host $bname
	node out/smsgen.js "$in/$bname.yaml" "$out/$bname.search-ms"
}

cd test
