compress(Str, ""):- string_length(Str, Len), Len =:= 0, !. 
compress(Str, Res):- string_chars(Str, [H|T]), compress(T, H, 1, [], Res).
compress([H], CurChar, CurCount, Compressed, Result):-
    H = CurChar,
    NewCount is CurCount + 1,
    number_chars(NewCount, CharList),
    append([H], CharList, NewPart),
    append(Compressed, NewPart, NewCompressed),
    text_to_string(NewCompressed, Result).

compress([H], CurChar, CurCount, Compressed, Result):-
    number_chars(CurCount, CharList1),
    append([CurChar], CharList1, NewPart1),
    append(Compressed, NewPart1, NewCompressed1),
    append(NewCompressed1, [H, '1'], NewCompressed2),
    text_to_string(NewCompressed2, Result).

compress([H|T], CurChar, CurCount, Compressed, Res):-
    H = CurChar,
    NewCount is CurCount + 1,
    compress(T, H, NewCount, Compressed, Res).

compress([H|T], CurChar, CurCount, Compressed, Res):-
    number_chars(CurCount, CharList),
    append([CurChar], CharList, NewPart),
    append(Compressed, NewPart, NewCompressed),
    compress(T, H, 1, NewCompressed, Res).
