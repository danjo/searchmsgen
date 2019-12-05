
$dir = "samples"
$outd="samples_gen"

rmdir $outd -Recurse -Force -ErrorAction Ignore
mkdir $outd

$files = Get-ChildItem $dir

foreach($file in $files){
	write-host $file.FullName
	
	$bn = $file.BaseName
	$outf = "${outd}/${bn}.search-ms"

	./smsgen.exe $file.FullName $outf
}
