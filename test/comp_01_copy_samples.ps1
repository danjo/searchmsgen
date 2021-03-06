$from = "../assets/samples"
$to = "out/comp/yaml"

rm -Force -Recurse $to -ErrorAction Ignore
mkdir $to | out-null

$files = $(Get-ChildItem $from/*.yaml)
$files | % {
	$name = $_.Name
	cp $from/$name $to/$name
}

