% Sum of list's elements
% List is [] -> [Head|Tail]
sumList([], 0):- !.
sumList([Head|Tail], Sum):- sumList(Tail, SumRec), Sum is SumRec + Head.

% Read list from user's input
% A, count and input is: 1. 2. 4. => A = [1, 2, 4]
readList([], 0):- !.
readList([Head|Tail], Count):- read(Head), Count1 is Count - 1, readList(Tail, Count1).

writeList(A):- write("An array is [ "), writeL(A).
writeL([]):- write("]"), !.
writeL([Head|Tail]):- write(Head), write(" "), writeL(Tail).

getItem(List, IndexToFind, Item):- getItem(List, 0, IndexToFind, Item).
getItem([Head|_], IndexToFind, IndexToFind, Head):- !.
getItem([_|Tail], CurrentIndex, IndexToFind, Item):- NewIndex is CurrentIndex + 1, getItem(Tail, NewIndex, IndexToFind, Item).

% findMin([Head|Tail]):- Res is Head, findMin(Tail, Res), write(Res).
% findMin([Head|Tail], Min):- Head >= Min, findMin(Tail, Min).
% findMin([Head|Tail], Min):- findMin(Tail, Head).
% findMin([], Min):- !.

contain([Head], Head):- !.
contain([Head|_], Head):- !.
contain([Head|Tail], Item):- contain(Tail, Item).

getIndex(List, Item, Res):- getIndex(List, Item, 0, Res).
getIndex([Head], Head, Index, Index):- !.
getIndex([Head|_], Head, Index, Index):- !.
getIndex([Head|Tail], Item, Index, Res):- NewIndex is Index + 1, getIndex(Tail, Item, NewIndex, Res).

getIndexAll(List, Item, ResList):- getIndexAll(List, Item, 0, Res, ResList).
getIndexAll([Head], Head, Index, Res, NewResList):- append(ResList, Res, NewResList), !.
getIndexAll([Head|Tail], Head, Index, Index, NewResList):- append(ResList, Index, NewResList), getIndexAll(Tail, Head, Index, Index, NewResList), !.
getIndexAll([Head|Tail], Item, Index, Res, ResList):- NewIndex is Index + 1, getIndexAll(Tail, Item, NewIndex, Res, ResList).