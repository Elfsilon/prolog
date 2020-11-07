package tests

import (
	"image/jpeg"
	"lab4/lib/blur"
	"lab4/lib/grad"
	"lab4/lib/grayscale"
	"os"
)

// TestGrad ...
func TestGrad() {
	imgFile, _ := os.Open("assets/picture2.jpg")
	defer imgFile.Close()

	loadedImg, _ := jpeg.Decode(imgFile)

	grayscaled := grayscale.Gray(loadedImg, grayscale.ComputeLuminosity)
	blur.GaussianBlur(grayscaled, 3, 3)
	grad := grad.Canny(grayscaled, grad.Sobel(), 0.6, 0.55)

	f1, _ := os.Create("trash/final/final.jpg")
	options := jpeg.Options{Quality: 100}
	jpeg.Encode(f1, grad, &options)
}
