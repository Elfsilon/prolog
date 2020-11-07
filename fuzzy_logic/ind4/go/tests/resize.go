package tests

import (
	"image/jpeg"
	"lab4/lib/resize"
	"os"
)

// TestResize ...
func TestResize() {
	imgFile, _ := os.Open("assets/picture.jpg")
	defer imgFile.Close()

	loadedImg, _ := jpeg.Decode(imgFile)

	imgResized1 := resize.Scale(300, 400, loadedImg)
	imgResized2 := resize.Scale(150, 200, loadedImg)
	imgResized3 := resize.Scale(30, 40, loadedImg)

	f1, _ := os.Create("trash/resize/resize1.jpg")
	f2, _ := os.Create("trash/resize/resize2.jpg")
	f3, _ := os.Create("trash/resize/resize3.jpg")

	options := jpeg.Options{Quality: 100}

	jpeg.Encode(f1, imgResized1, &options)
	jpeg.Encode(f2, imgResized2, &options)
	jpeg.Encode(f3, imgResized3, &options)
}
