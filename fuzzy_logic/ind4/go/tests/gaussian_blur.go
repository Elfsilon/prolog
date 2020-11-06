package tests

import (
	"image/jpeg"
	"lab4/lib/blur"
	"lab4/lib/grayscale"
	"os"
)

// TestGauss ...
func TestGauss() {
	imgFile, _ := os.Open("assets/picture.jpg")
	defer imgFile.Close()

	loadedImg, _ := jpeg.Decode(imgFile)
	toBlur := grayscale.Gray(loadedImg, grayscale.ComputeAVG)

	blur.GaussianBlur(toBlur, 7)

	f, _ := os.Create("trash/blur/gaussian.jpg")
	options := jpeg.Options{Quality: 100}
	jpeg.Encode(f, toBlur, &options)
}
