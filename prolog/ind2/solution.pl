% Counts arithmetic mean of the list's elemets 
listAvg([], 0):- !.
listAvg([H], H):- !.
listAvg(List, Res):- listAvg(List, 0, 0, Res).
listAvg([H], Sum, Count, Res):- 
    EndSum is Sum + H,
    EndCount is Count + 1,
    Res is EndSum / EndCount.
listAvg([H|T], Sum, Count, Res):-
    NewSum is Sum + H,
    NewCount is Count + 1,
    listAvg(T, NewSum, NewCount, Res).


% Finds max element of the list
listMax([], 0):- !.
listMax([H], H):- !.
listMax([H|T], Res):- listMax(T, H, Res).
listMax([H], H, H):- !.
listMax([H], Max, NewRes):- 
    H > Max,
    NewRes is H.
listMax([H], Max, Max).
listMax([H|T], Max, Res):-
    H > Max,
    NewMax is H,
    listMax(T, NewMax, Res).
listMax([H|T], Max, Res):-
    listMax(T, Max, Res).


% Returns length of the list
lenList(List, Res):- lenList(List, 0, Res).
lenList([], _, 0):- !.
lenList([H], Len, Res):- Res is Len + 1.
lenList([H|T], Len, Res):-
    NewLen is Len + 1,
    lenList(T, NewLen, Res).


% Builds new list where every element is greater than avg(L1) and less then max(L1)
buildList([], []):- !.
buildList([H], []):- !.
buildList(L1, Res):- lenList(L1, Len), listAvg(L1, Avg), listMax(L1, Max), buildList(Len, Avg, Max, 0, [], Res).
buildList(_, Same, Same, _, _, []):- !.
buildList(Len, _, _, Len, List, List):- !.
buildList(Len, Avg, Max, CurLen, List, Res):- 
    Min is Avg + 1,
    random(Min, Max, Rand),
    append(List, [Rand], NewList),
    NewCurLen is CurLen + 1,
    buildList(Len, Avg, Max, NewCurLen, NewList, Res).