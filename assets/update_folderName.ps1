
$dir="samples_gen"
$from="C:\\Users\\someUser"
$to="C:\Users\anyUser"
$outd="samples_gen_edit"

rmdir $outd -Recurse -Force -ErrorAction Ignore
mkdir $outd

$files = Get-ChildItem $dir

foreach($file in $files){
	write-host $file.FullName
	
	$name = $file.Name
	$outf = "${outd}/${name}"
	$content = get-content $file.FullName

	$content -replace $from, $to | out-file $outf
}