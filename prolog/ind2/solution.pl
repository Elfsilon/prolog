% Counts arithmetic mean of the list's elemets 
list_avg([], 0):- !.
list_avg([H], H):- !.
list_avg(List, Res):- list_avg(List, 0, 0, Res).
list_avg([H], Sum, Count, Res):- 
    EndSum is Sum + H,
    EndCount is Count + 1,
    Res is EndSum / EndCount.
list_avg([H|T], Sum, Count, Res):-
    NewSum is Sum + H,
    NewCount is Count + 1,
    list_avg(T, NewSum, NewCount, Res).


% Finds max element of the list
list_max([], 0):- !.
list_max([H], H):- !.
list_max([H|T], Res):- list_max(T, H, Res).
list_max([H], H, H):- !.
list_max([H], Max, NewRes):- 
    H > Max,
    NewRes is H.
list_max([H], Max, Max).
list_max([H|T], Max, Res):-
    H > Max,
    NewMax is H,
    list_max(T, NewMax, Res).
list_max([H|T], Max, Res):-
    list_max(T, Max, Res).


% Returns length of the list
len_list(List, Res):- len_list(List, 0, Res).
len_list([], _, 0):- !.
len_list([H], Len, Res):- Res is Len + 1.
len_list([H|T], Len, Res):-
    NewLen is Len + 1,
    len_list(T, NewLen, Res).


% Builds new list where every value generates arbitrary in interval (avg(L1), max(L1))
build_list([], []):- !.
build_list([H], []):- !.
build_list(L1, Res):- len_list(L1, Len), list_avg(L1, Avg), list_max(L1, Max), build_list(Len, Avg, Max, 0, [], Res).
build_list(_, Same, Same, _, _, []):- !.
build_list(Len, _, _, Len, List, List):- !.
build_list(Len, Avg, Max, CurLen, List, Res):- 
    Min is Avg + 1,
    random(Min, Max, Rand),
    append(List, [Rand], NewList),
    NewCurLen is CurLen + 1,
    build_list(Len, Avg, Max, NewCurLen, NewList, Res).


% Builds new list from given with all values from L1 which greater then avg(L1) and less then max(L1)
build_list2([], []):- !.
build_list2([H], []):- !.
build_list2(L1, Res):- list_avg(L1, Avg), list_max(L1, Max), build_list2(L1, Avg, Max, [], Res).
build_list2([], Avg, Max, Res, Res):- !.
build_list2([H|T], Avg, Max, NList, Res):-
    H > Avg, H < Max,
    append(NList, [H], NList2),
    build_list2(T, Avg, Max, NList2, Res), !.
build_list2([H|T], Avg, Max, NList, Res):- build_list2(T, Avg, Max, NList, Res), !.