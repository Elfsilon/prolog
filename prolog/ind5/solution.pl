find_solutions():- open('./prolog/ind5/solutions.txt', write, File), find_solutions(8, 7, 6, 5, 4, 1, 1, 1, 1, 1, File).
find_solutions(Max1, Max2, Max3, Max4, Max5, Cur1, Cur2, Cur3, Cur4, Cur5, File):-
    Cur1 =:= Max1,
    close(File).
find_solutions(Max1, Max2, Max3, Max4, Max5, Cur1, Cur2, Cur3, Cur4, Cur5, File):-
    Cur2 =:= Max2,
    NewCur1 is Cur1 + 1,
    find_solutions(Max1, Max2, Max3, Max4, Max5, NewCur1, 1, 1, 1, 1, File).

find_solutions(Max1, Max2, Max3, Max4, Max5, Cur1, Cur2, Cur3, Cur4, Cur5, File):-
    Cur3 =:= Max3,
    NewCur2 is Cur2 + 1,
    find_solutions(Max1, Max2, Max3, Max4, Max5, Cur1, NewCur2, 1, 1, 1, File).

find_solutions(Max1, Max2, Max3, Max4, Max5, Cur1, Cur2, Cur3, Cur4, Cur5, File):-
    Cur4 =:= Max4,
    NewCur3 is Cur3 + 1,
    find_solutions(Max1, Max2, Max3, Max4, Max5, Cur1, Cur2, NewCur3, 1, 1, File).

find_solutions(Max1, Max2, Max3, Max4, Max5, Cur1, Cur2, Cur3, Cur4, Cur5, File):-
    Cur5 =:= Max5,
    NewCur4 is Cur4 + 1,
    find_solutions(Max1, Max2, Max3, Max4, Max5, Cur1, Cur2, Cur3, NewCur4, 1, File).

find_solutions(Max1, Max2, Max3, Max4, Max5, Cur1, Cur2, Cur3, Cur4, Cur5, File):-
    Sum is Cur1 + Cur2 + Cur3 + Cur4 + Cur5,
    Sum =:= 20,
    format(File, "x1 = ~d, x2 = ~d, x3 = ~d, x4 = ~d, x5 = ~d\n", [Cur1, Cur2, Cur3, Cur4, Cur5]),
    NewCur5 is Cur5 + 1,
    find_solutions(Max1, Max2, Max3, Max4, Max5, Cur1, Cur2, Cur3, Cur4, NewCur5, File).

find_solutions(Max1, Max2, Max3, Max4, Max5, Cur1, Cur2, Cur3, Cur4, Cur5, File):-
    NewCur5 is Cur5 + 1,
    find_solutions(Max1, Max2, Max3, Max4, Max5, Cur1, Cur2, Cur3, Cur4, NewCur5, File).