$target = "out/comp/sms"

# drop xml comment for diff
$files = $(Get-ChildItem $target/*.search-ms)
$files | % {
	$file = $_
	write-host $file
	$data = get-content $file
	$data2 = $($data -replace "<!--.*-->","")
	$data2 | out-file $file -Encoding utf8
}
