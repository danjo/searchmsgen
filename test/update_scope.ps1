$target = "out"
$replaces = @(
	@("c:\\Users\\someUser", "c:\dev\vscode"),
	@("C:\\Users\\someUser", "C:\dev\vscode")
)

$orig = "$target/orig"
$files = $(Get-ChildItem $target/*.search-ms)
if((Test-Path $orig) -eq $false){
	mkdir $orig | Out-Null
}
$files | % {
	$name = $_.Name
	cp $target/$name $orig/$name
}

$files = $(Get-ChildItem $target/*.search-ms)
$files | % {
	$file = $_
	$data = get-content $file
	$replaces | % {
		$rep = $_
		$data2 = $($data | % { $_ -replace $rep })
		$data = $data2
	}
	$data | out-file $file -Encoding utf8
}
