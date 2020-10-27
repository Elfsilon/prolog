in_list([El|_],El).
in_list([_|T],El):-in_list(T,El).

sprava_next(A,B,[C]):-fail.
sprava_next(A,B,[A|[B|Tail]]).
sprava_next(A,B,[_|List]):-sprava_next(A,B,List).
% [leonid, city, _] [_, penza, city]

set_penza().

fill([_, City, _], [[_, _, City]|Tail]):- fill([_, City, _], Tail).
fill(A, [A|Tail]).

pr_ein:- 
    Humans=[_,_,_,_,_],
    in_list(Humans, [sergey, _, riga]),
    in_list(Humans, [boris, riga, penza]),
    in_list(Humans, [viktor, _, moscow]),
    in_list(Humans, [viktor, lvov, _]),
    in_list(Humans, [grigoriy, _, harkov]),
    in_list(Humans, [leonid, _, _]),
    % in_list(Humans, [_, penza, _]),
    % from penza rides on byc from leonid city
    fill([_, penza, _], Humans),
	write(Humans), nl.