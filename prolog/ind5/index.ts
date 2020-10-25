let num: number = 0;

for (let x0 = 0; x0 < 8; x0++) {
    for (let x1 = 0; x1 < 7; x1++) {
        for (let x2 = 0; x2 < 6; x2++) {
            for (let x3 = 0; x3 < 5; x3++) {
                for (let x4 = 0; x4 < 4; x4++) {
                    if (x0 + x1 + x2 + x3 + x4 === 20) {
                        console.log(x0, x1, x2, x3, x4);
                        num++;
                    }
                }
            }
        }
    }
}

console.log(num);
