// Greatest Common Divisor
const gcd = (a, b) => {
    return b == 0 ? a : gcd(b, a % b);
}

// Least Common Multiplier
const lcm = (a, b) => {
    return a / gcd(a, b) * b;
}

const isRelativePrimes = (a, b) => {
    return gcd(a, b) == 1; 
}

const isOdd = (a) => {
    return a % 2 != 0;
}

const getTriple = (m, n, k) => {
    return {
        x: k * (m ** 2 - n ** 2),
        y: k * 2 * m * n,
        z: k * (m ** 2 + n ** 2),
    }
}

const getTripleFromPrimitive = (primitiveTriple, k) => {
    return {
        x: k * primitiveTriple.x,
        y: k * primitiveTriple.y,
        z: k * primitiveTriple.z,
    }
}

const getTriplesFromPrimitiveUnderPerimeter = (primitiveTriple, p) => {
    const triples = [];
    let ratio = 1;
    let triple = primitiveTriple;
    while (triple.x + triple.y + triple.z <= p) {
        triples.push(triple);
        ratio++;
        triple = getTripleFromPrimitive(primitiveTriple, ratio);
    }
    return triples;
}

const generateTriplesUnderPerimeter = (p) => {
    const result = [];
    let m = 2;
    let n = 1; 
    let condition = true;
    while (condition) {
        while (n < m) {
            if (m ** 2 + n ** 2 > p) {
                condition = false;
                break;
            }
            if (isOdd(m - n) && isRelativePrimes(m, n)) {
                const primitiveTriple = getTriple(m, n, 1);
                const triples = getTriplesFromPrimitiveUnderPerimeter(primitiveTriple, p);
                if (triples.length > 0) {
                    result.push(...triples);
                }
            }
            n++;
        }
        m++;
        n = 1;
    }
    return result;
}

const filterByPerimeter = (triples, p) => {
    return triples.filter(t => t.x + t.y + t.z == p);
}

const generateTriplesByPerimeter = (p) => {
    const underPerimeter = generateTriplesUnderPerimeter(p);
    return filterByPerimeter(underPerimeter, p);
}

let maxRes = {
    perimeter: 0,
    trianglesCount: 0,
    triangles: null,
}
const triples = generateTriplesUnderPerimeter(1000);
for (let p = 12; p <= 1000; p++) {
    const filtered = filterByPerimeter(triples, p);
    if (filtered.length > maxRes.trianglesCount) {
        maxRes = {
            perimeter: p,
            trianglesCount: filtered.length,
            triangles: filtered,
        }
    }
}
console.log(maxRes);