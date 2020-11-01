% Return true if all elements of list are uniq
is_uniq([]).
is_uniq([H|T]):- not(member(H, T)), is_uniq(T).


% Permutations builder
eval([], _).
eval([H|T], Set):- member(H, Set), eval(T, Set).
perm(N, Set, Perm):- length(Perm, N), eval(Perm, Set). %, is_uniq(Perm).


% Checks if there in Edges given edge
edge(A, B, Edges):- member([A,B], Edges).


% Return true if path exists
path(A, B, Edges):-
    walk(A, B, [], Edges).        

walk(A, B, Visited, Edges):-
    edge(A, X, Edges),
    not(member(X, Visited)),
    (
      B = X; 
      walk(X, B, [A|Visited], Edges)
    ). 


% Builds transitive closure of the graph by given V and E
closure(Vertices, Edges, V1, V2):-
    perm(2, Vertices, [V1, V2|_]),
    path(V1, V2, Edges).
closure(Vertices, Edges, Closure):- bagof([V1, V2], closure(Vertices, Edges, V1, V2), Bag), make_uniq(Bag, Closure), write_list(Closure), !.

% Delete all duplicates in list of edges
make_uniq(Lst, Res):- make_uniq(Lst, [], Res).
make_uniq([], U, U).
make_uniq([H|T], U, R):- not(member(H,U)), append(U, [H], NU), make_uniq(T, NU, R).
make_uniq([H|T], U, R):- make_uniq(T, U, R).


write_list([]).
write_list([[H1,H2]|T]):- write("["), write(H1), write(", "), write(H2), write("]"), nl, write_list(T).
