brute_force():- open('./prolog/ind5/solutions.txt', write, File), brute_force(File, 0, 0, 0, 0, 0), !.
brute_force(File, X1, X2, X3, X4, 4):- NX4 is X4 + 1, brute_force(File, X1, X2, X3, NX4, 0).
brute_force(File, X1, X2, X3, 5, X5):- NX3 is X3 + 1, brute_force(File, X1, X2, NX3, 0, 0).
brute_force(File, X1, X2, 6, X4, X5):- NX2 is X2 + 1, brute_force(File, X1, NX2, 0, 0, 0).
brute_force(File, X1, 7, X3, X4, X5):- NX1 is X1 + 1, brute_force(File, NX1, 0, 0, 0, 0).
brute_force(File, 8, X2, X3, X4, X5):- close(File), !.
brute_force(File, X1, X2, X3, X4, X5):- write_file(File, X1, X2, X3, X4, X5), NX5 is X5 + 1 , brute_force(File, X1, X2, X3, X4, NX5).


write_file(File, X1, X2, X3, X4, X5):-
    Sum is X1 + X2 + X3 + X4 + X5,
    Sum = 20,
    format(File, "x1 = ~d, x2 = ~d, x3 = ~d, x4 = ~d, x5 = ~d\n", [X1, X2, X3, X4, X5]).
write_file(File, _, _, _, _, _):- !.

brute_force():- brute_force(0, 0), !.
brute_force(I, 817):- I1 is I + 1, brute_force(I1, 0).
brute_force(817, J):- write("/nend"), !.
brute_force(I, J):-
    write("Итерация"),
    J1 is J + 1,
    brute_force(I, J1).
