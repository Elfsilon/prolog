in_list([El|_],El).
in_list([_|T],El):-in_list(T,El).

pr_velo:- 
    Velo=[_,_,_,_,_],
    in_list(Velo, [serg, _, riga]),
    in_list(Velo, [boris, riga, penza]),
    in_list(Velo, [victor, lvov, mosc]),
    in_list(Velo, [grig, _, harckov]),
    in_list(Velo, [leonid, X, _]),
    in_list(Velo, [_, penza, X]),
    in_list(Velo, [_, _, lvov]),
    in_list(Velo, [_, mosc, _]),
    in_list(Velo, [_, harckov, _]),
    not(in_list(Velo, [_, penza, penza])),
    not(in_list(Velo, [_, riga, riga])),
    not(in_list(Velo, [_, lvov, lvov])),
    not(in_list(Velo, [_, harckov, harckov])),
    not(in_list(Velo, [_, mosc, mosc])),
    write(Velo).