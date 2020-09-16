max(X,Y,Z) :- X > Y, Z = X.
max(X,Y,Z) :- Z = Y .

max_refactor(X, Y, X) :- X > Y, !.
max_refactor(_, Y, Y) .

% _ - что-то но совершенно не важно что
% ! - если условие выполнилось то не ходить в другие части предиката

% fact_down(N,X) :- fact_down(1,N,1,X) .
% fact_down(N,N,X,X) :- ! .
% fact_down(I,N,S,X) :- I1 is I+1, S1 is S*I1, fact_down(I1,N,S1,X) .

fib(1,1) :- ! .
fib(2,1) :- ! .
fib(N,X) :- N1 is N-1, fib(N1,X1), N2 is N - 2, fib(N2,X2), X is X1+X2 .

% is_prime(2) :- ! .
% is_prime(X) :- is_prime(2, X) .
% is_prime(X, X) :- ! .
% is_prime(N, X) :- O is X mod N, O > 0, N1 is N + 1, is_prime(N1, X) .

sum(X,X) :- X < 10, ! .
sum(X,Sum) :- Last is X mod 10, Number is X div 10, sum(Number, NewSum), Sum is Last + NewSum .