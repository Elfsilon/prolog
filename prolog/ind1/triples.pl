% -----
% IND 1
% -----

% Checking whether the number is odd
odd(X) :- 1 is mod(X, 2).

% Getting greatest common divisor
gcd(0, X, X):- X > 0, !.
gcd(X, Y, Z):- X >= Y, X1 is X-Y, gcd(X1,Y,Z).
gcd(X, Y, Z):- X < Y, X1 is Y-X, gcd(X1,X,Z).

% Return true if both of numbers are relative primes
relativePrimes(A, B):- gcd(A, B, R), R is 1.

% Getting the triple using Euclid alg
getTriple(M, N, K, X, Y, Z):-
    X is K * (M * M - N * N),
    Y is K * (2 * M * N),
    Z is K * (M * M + N * N).

% Getting triple from primitive by multiply it on K
getTripleFromPrimitive(X, Y, Z, K, X1, Y1, Z1):-
    X1 is K * X,
    Y1 is K * Y,
    Z1 is K * Z.

% Generating of all Triples from Primitive that are under the perimeter
getTriplesFromPrimitive(X, Y, Z, P, Result):- 
    X + Y + Z =< P, 
    getTriplesFromPrimitiveRec(X, Y, Z, P, 1, [], Result), !.
getTriplesFromPrimitive(X, Y, Z, P, []).
getTriplesFromPrimitiveRec(X, Y, Z, P, 1, List, Result):- 
    append(List, [[X, Y, Z]], NewList),
    getTriplesFromPrimitiveRec(X, Y, Z, P, 2, NewList, Result).
getTriplesFromPrimitiveRec(X, Y, Z, P, K, List, Result):- 
    getTripleFromPrimitive(X, Y, Z, K, X1, Y1, Z1),
    X1 + Y1 + Z1 =< P,
    append(List, [[X1, Y1, Z1]], NewList),
    K1 is K + 1,
    getTriplesFromPrimitiveRec(X, Y, Z, P, K1, NewList, Result).
getTriplesFromPrimitiveRec(X, Y, Z, P, K, List, List).

% Returns true if the sum of digits equals perimeter
isEqualPerimeter(List, Perim):- sumList(List, Sum), Sum =:= Perim.
isEqualPerimeter([], _, _):- false, !.
isEqualPerimeter(_, 0, _):- false, !.

% Filtering list of triples by perimeter
filterByPerimeter([], P, []):- !.
filterByPerimeter(_, 0, []):- !.
filterByPerimeter(List, P, Res):- filterByPerimeter(List, P, [], Res).
filterByPerimeter([H], P, List, Res):- isEqualPerimeter(H, P), append(List, [H], Res).
filterByPerimeter([H], P, List, List):- !.
filterByPerimeter([H|T], P, List, Res):- 
    isEqualPerimeter(H, P),
    append(List, [H], List1),
    filterByPerimeter(T, P, List1, Res).
filterByPerimeter([H|T], P, List, Res):- 
    filterByPerimeter(T, P, List, Res).

% Getting all triples under the perimeter
getTriplesUnderPerimeter(P, Result):- getTriplesUnderPerimeterRec(2, 1, P, [], Result).
getTriplesUnderPerimeterRec(M, M, P, List, Result):- M1 is M + 1, getTriplesUnderPerimeterRec(M1, 1, P, List, Result).
getTriplesUnderPerimeterRec(M, N, P, List, Result):-
    M * M + N * N =< P,
    Dif is M - N, odd(Dif),
    relativePrimes(M, N),
    getTriple(M, N, 1, X, Y, Z),
    getTriplesFromPrimitive(X, Y, Z, P, Triples),
    append(List, Triples, NewList),
    N1 is N + 1,
    getTriplesUnderPerimeterRec(M, N1, P, NewList, Result).
getTriplesUnderPerimeterRec(M, N, P, List, Result):- 
    M * M + N * N =< P,
    N1 is N + 1,
    getTriplesUnderPerimeterRec(M, N1, P, List, Result).
getTriplesUnderPerimeterRec(M, N, P, List, List):- !.


% Solving the problem
test(Lim, ResP, ResC):- Lim >= 12, getTriplesUnderPerimeter(Lim, Triples), test(Lim, Triples, 12, -1, -1, ResP, ResC).
test(Lim, []):- !.
test(Lim, Triples, P, MaxP, MaxC, MaxP, MaxC):- P > Lim, !.
test(Lim, Triples, P, MaxP, MaxC, ResP, ResC):-
    filterByPerimeter(Triples, P, Filtered),
    lenList(Filtered, Len),
    Len > MaxC,
    NewMaxC is Len,
    NewMaxP is P,
    NewP is P + 1,
    test(Lim, Triples, NewP, NewMaxP, NewMaxC, ResP, ResC).
test(Lim, Triples, P, MaxP, MaxC, ResP, ResC):-
    NewP is P + 1,
    test(Lim, Triples, NewP, MaxP, MaxC, ResP, ResC).


% -------
% HELPERS
% -------

% Returns length of the list
lenList(List, Res):- lenList(List, 0, Res).
lenList([], _, 0):- !.
lenList([H], Len, Res):- Res is Len + 1.
lenList([H|T], Len, Res):-
    NewLen is Len + 1,
    lenList(T, NewLen, Res).

% Adding all the numbers of the list
sumList(List, Result):- sumList(List, 0, Result).
sumList([], _, 0):- !.
sumList([H], Sum, EntireSum):- EntireSum is Sum + H.
sumList([H|T], Sum, Result):-
    NewSum is Sum + H,
    sumList(T, NewSum, Result).

% Writing the list
writeList([]):- write('[empty]\n').
writeList([H]):- write(H), write(' \n').
writeList([H|T]):-
    write(H), write(' '),
    writeList(T).