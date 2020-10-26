in_list([El|_],El).
in_list([_|T],El):-in_list(T,El).

sprava_next(A,B,[C]):-fail.
sprava_next(A,B,[A|[B|Tail]]).
sprava_next(A,B,[_|List]):-sprava_next(A,B,List).
% [leonid, city, _] [_, penza, city]

fill_city([Name, City, _], [[Name, _, City]]).
fill_city([Name, City, _], [[Name, City, _
    

pr_ein:- 
    Humans=[_,_,_,_,_],
    in_list(Humans, [sergey, _, riga]),
    in_list(Humans, [boris, riga, penza]),
    in_list(Humans, [viktor, _, moscow]),
    in_list(Humans, [grigoriy, _, harkov]),
    in_list(Humans, [viktor, lvov, _]),
    in_list(Humans, [leonid, _, _]),
    % in_list(Humans, [_, penza, _]),
    % from penza rides on byc from leonid city
    fill_city([_, penza, _], Humans),
	write(Humans), nl.