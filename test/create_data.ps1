del -Recurse -Force "data"
mkdir "data" | out-null

$dir = "data/someUser"
mkdir "$dir" | out-null
mkdir "$dir/AppData" | out-null
mkdir "$dir/Documents" | out-null

$files = @(
	"AppData/hello.txt"
	"Documents/hello.txt"
	"hello.txt"
	"textfoo.txt"
	"textbar.txt"
	"pic.gif"
	"pic.jpg"
	"pic.png"
	"pic.tiff"
	"pic1m.jpg"
	"pic1mi.jpg"
	"pic5m.jpg"
	"vid.mp4"
	"vido1.mp4"
	"vido2.mp4"
)
$files | %{ new-item "$dir/$_" } | out-null

echo "hello" > "$dir/AppData/hello.txt"
echo "hello" > "$dir/Documents/hello.txt"
echo "hello" > "$dir/hello.txt"
echo "foo" > "$dir/textfoo.txt"
echo "bar" > "$dir/textbar.txt"

$mb = "a" * (1000 * 1000)
$mib = "a" * (1024 * 1024)
Set-Content "$dir/pic1m.jpg" $mb -NoNewLine
Set-Content "$dir/pic1mi.jpg" $mib -NoNewLine
Set-Content "$dir/pic5m.jpg" ($mb * 5) -NoNewLine

$now = get-date
$old1 = $now.AddDays(-10)
$old2 = $now.AddDays(-30)
$(get-item "$dir/vido1.mp4").LastWriteTime = $old1
$(get-item "$dir/vido2.mp4").LastWriteTime = $old2

ls $dir
