y = 20
n = 4
yn = y + n

xs = [8, 7, 6, 5, 4]

x1 = 8
x2 = 7
x3 = 6
x4 = 5
x5 = 4

def comb(n, k):
    if (k > n):
        return 0
    return int(fact(n) / (fact(k) * fact(n - k)))

def fact(n):
    if (n == 0): 
        return 1
    else:
        return n * fact(n - 1)

N = comb(yn, n)
print("N =", N)

# c1 = comb(yn - x1, n)
# c2 = comb(yn - x2, n)
# c3 = comb(yn - x3, n)
# c4 = comb(yn - x4, n)
# c5 = comb(yn - x5, n)
# sum1 = 0
# for i in [c1, c2, c3, c4, c5]:
#     sum1 += i

# # 2
# c1c2 = comb(yn - x1 - x2, n)
# c1c3 = comb(yn - x1 - x3, n)
# c1c4 = comb(yn - x1 - x4, n)
# c1c5 = comb(yn - x1 - x5, n)

# c2c3 = comb(yn - x2 - x3, n)
# c2c4 = comb(yn - x2 - x4, n)
# c2c5 = comb(yn - x2 - x5, n)

# c3c4 = comb(yn - x3 - x4, n)
# c3c5 = comb(yn - x3 - x5, n)

# c4c5 = comb(yn - x4 - x5, n)

# sum2 = 0
# for i in [c1c2, c1c3, c1c4, c1c5, c2c3, c2c4, c2c5, c3c4, c3c5, c4c5]:
#     sum2 += i


# print("sum1 =", sum1)
# print("sum2 =", sum2)

sum1 = 0
for i in range(0, len(xs)):
    sum1 += comb(yn - xs[i], n)

sum2 = 0
for i in range(0, len(xs) - 1):
    for j in range(i + 1, len(xs)):
        sum2 += comb(yn - xs[i] - xs[j], n)

sum3 = 0
for i in range(0, len(xs) - 2):
    for j in range(i + 1, len(xs) - 1):
        for l in range(j + 1, len(xs)):
            if (yn - xs[i] - xs[j] - xs[l] >= 0):
                sum3 += comb(yn - xs[i] - xs[j] - xs[l], n)

sum4 = 0
for i in range(0, len(xs) - 3):
    for j in range(i + 1, len(xs) - 2):
        for l in range(j + 1, len(xs) - 1):
            for m in range(l + 1, len(xs)):
                print(i, j, l, m)
                if (yn - xs[i] - xs[j] - xs[l] - xs[m] >= 0):
                    sum4 += comb(yn - xs[i] - xs[j] - xs[l] - xs[m], n)

print("sum1 =", sum1)
print("sum2 =", sum2)
print("sum3 =", sum3)
print("sum4 =", sum4)

print("N[end] = ", N - sum1 + sum2 - sum3)