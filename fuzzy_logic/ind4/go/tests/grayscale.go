package tests

import (
	"fmt"
	"image/jpeg"
	"lab4/lib/grayscale"
	"os"
)

// TestGrayscale ...
func TestGrayscale() {
	imgFile, _ := os.Open("assets/picture.jpg")
	defer imgFile.Close()

	loadedImg, _ := jpeg.Decode(imgFile)
	fmt.Println("test")

	grayScaled1 := grayscale.Gray(loadedImg, grayscale.ComputeAVG)
	grayScaled2 := grayscale.Gray(loadedImg, grayscale.ComputeLightness)
	grayScaled3 := grayscale.Gray(loadedImg, grayscale.ComputeLuminosity)

	f1, _ := os.Create("trash/grayscale/AVG.jpg")
	f2, _ := os.Create("trash/grayscale/Lightness.jpg")
	f3, _ := os.Create("trash/grayscale/Luminosity.jpg")

	options := jpeg.Options{Quality: 100}

	jpeg.Encode(f1, grayScaled1, &options)
	jpeg.Encode(f2, grayScaled2, &options)
	jpeg.Encode(f3, grayScaled3, &options)
}
