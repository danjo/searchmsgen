#./01_copy_samples.ps1
#./02_npm_build.ps1
#./03_node_batch.ps1
#./04_edit_gen.ps1

$target = "out"
$comp = "comp"

$target_files = @{}
$comp_files = @{}
Get-ChildItem $target/*.search-ms | %{
	$name = $_.Name
	$target_files[$name] = Get-Content "$target/$name"
}
Get-ChildItem $comp/*.search-ms | %{
	$name = $_.Name
	$comp_files[$name] = Get-Content "$comp/$name"
}

Describe "comp" {
	It "1" {
		$comp_files.Keys | %{
			$target_files.ContainsKey($_) } | ?{ $_ -eq $false } | should -BeNullOrEmpty
		$target_files.Keys | %{
			$comp_files.ContainsKey($_) } | ?{ $_ -eq $false } | should -BeNullOrEmpty
	}
	It "2" {
		$comp_files.Keys | sort | %{
			Write-Host $_
			$t = $target_files[$_]
			$c = $comp_files[$_]
			Compare-Object $t $c | should -BeNullOrEmpty
		}
	}
}
