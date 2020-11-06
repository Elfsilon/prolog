package blur

import (
	"image"
	"math"
)

func gaussian1d(x, sigma, mu float64) float64 {
	return math.Exp(-math.Pow((x-mu)/sigma, 2.0) / 2.0)
	// return math.Exp(-0.5*(math.Pow((x-mean)/ratio, 2.0)+math.Pow((y-mean)/ratio, 2.0))) / (2 * math.Pi * ratio * ratio)
}

func setupKernel(r int) [][]float64 {
	var sum, sigma float64 = 0, float64(r) / 2
	var kerW int = 2*r + 1
	kernel1d := make([]float64, kerW)
	kernel2d := make([][]float64, kerW)
	for i := range kernel2d {
		kernel2d[i] = make([]float64, kerW)
	}

	// Building kernel 1D
	for x := 0; x < kerW; x++ {
		kernel1d[x] = gaussian1d(float64(x), sigma, float64(r))
	}

	// Building weight matrix of kernel 2D
	for x := 0; x < kerW; x++ {
		for y := 0; y < kerW; y++ {
			kernel2d[x][y] = kernel1d[x] * kernel1d[y]
			sum += kernel2d[x][y]
		}
	}

	// Normalize
	for x := 0; x < kerW; x++ {
		for y := 0; y < kerW; y++ {
			kernel2d[x][y] /= sum
		}
	}
	return kernel2d
}

func cropMatrix() {}

// GaussianBlur ...
func GaussianBlur(img *image.Gray, radius int) {
	b := img.Bounds()
	width := b.Max.X
	height := b.Max.Y

	for i := radius; i < height-radius; i++ {
		for j := radius; j < width-radius; j++ {
			kernel := setupKernel(radius)
			var center float64 = 0
			for ii := i - radius; ii < i+radius+1; ii++ {
				for jj := j - radius; jj < j+radius+1; jj++ {
					offset := img.PixOffset(ii, jj)
					center += float64(img.Pix[offset]) * kernel[ii-(i-radius)][jj-(j-radius)]
				}
			}
			offset := img.PixOffset(i, j)
			img.Pix[offset] = uint8(center)
		}
	}
}
