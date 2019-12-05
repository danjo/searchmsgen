$target = "comp"
$pwd = $(pwd).Path
$replaces = @(
	@("c:\\Users\\someUser", "$pwd\data\someUser"),
	@("C:\\Users\\someUser", "$pwd\data\someUser")
)

mkdir "out/update_scope" -ErrorAction Ignore

$files = $(Get-ChildItem $target/*.search-ms)
$files | % {
	$file = $_
	$data = get-content $file
	$replaces | % {
		$rep = $_
		$data2 = $($data | % { $_ -replace $rep })
		$data = $data2
	}
	$toFile = $pwd + "/out/update_scope/" + $file.Name
	$data | out-file $toFile -Encoding utf8
}
