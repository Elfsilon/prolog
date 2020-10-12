odd(X) :- 1 is mod(X, 2).

gcd(0, X, X):- X > 0, !.
gcd(X, Y, Z):- X >= Y, X1 is X-Y, gcd(X1,Y,Z).
gcd(X, Y, Z):- X < Y, X1 is Y-X, gcd(X1,X,Z).

relativePrimes(A, B):- gcd(A, B, R), R is 1.

getTriple(M, N, K, X, Y, Z):- 
    X is K * (M * M - N * N), 
    Y is K * 2 * M * N, 
    Z is K * (M * M + N * N).

getTripleFromPrimitive(K, X, Y, Z, Xt, Yt, Zt):-
    Xt is K * X, 
    Yt is K * Y, 
    Zt is K * Z.

getTriplesFromPrimitiveUnderPerimeter(P, X, Y, Z, Ratio, false, List, Res).
getTriplesFromPrimitiveUnderPerimeter(P, X, Y, Z, Ratio, true, List, Res):-
    getTripleFromPrimitive(Ratio, X, Y, Z, Xt, Yt, Zt),
    Cond is (Xt + Yt + Zt =< P),
    append(List, [Xt, Yt, Zt], Res),
    getTriplesFromPrimitiveUnderPerimeter(P, X, Y, Z, Ratio + 1, Cond, Res, Res).

test(Res):- getTriplesFromPrimitiveUnderPerimeter(120, 3, 4, 5, 1, [], Res).