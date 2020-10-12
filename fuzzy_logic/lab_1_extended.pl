% *******
% Helpers
% *******

fn(X, Tg, A, R):- Tg >= 0, R is Tg * (X - A), !.
fn(X, Tg, A, R):- R is Tg * (X - A) + 1. 

% **************
% Term functions
% **************

% First term function
firstTerm(X, 0, M, Tg):- X >= M + 1 / Tg, !.
firstTerm(X, 1, M, Tg):- X >= 0, X < M, !.
firstTerm(X, MuX, M, Tg):- X >= M, X < M + 1 / Tg, fn(X, -Tg, M, MuX).

% Middle term function
middleTerm(X, 0, M, Tg):- X >= 0, X < M - 1 / Tg; X >= M + 1 / Tg, !.
middleTerm(X, MuX, M, Tg):- X >= M - 1 / Tg, X < M, fn(X, Tg, M - 1 / Tg, MuX), !.
middleTerm(X, MuX, M, Tg):- X >= M, X < M + 1 / Tg, fn(X, -Tg, M, MuX).

% Last term function
lastTerm(X, 0, M, Tg):- X >= 0, X < M - 1 / Tg, !.
lastTerm(X, 1, M, Tg):- X >= M, !.
lastTerm(X, MuX, M, Tg):- X >= M - 1 / Tg, X < M, fn(X, Tg, M - 1 / Tg, MuX).

% Function check-wrappers of term functions
isFirstTerm(X, M, Tg):- firstTerm(X, MuX, M, Tg), MuX > 0.5 .
isFirstTermIn(X, M, Tg):- firstTerm(X, MuX, M, Tg), MuX >= 0.5 .

isMiddleTerm(X, M, Tg):- middleTerm(X, MuX, M, Tg), MuX > 0.5 .
isMiddleTermIn(X, M, Tg):- middleTerm(X, MuX, M, Tg), MuX >= 0.5 .

isLastTerm(X, M, Tg):- lastTerm(X, MuX, M, Tg), MuX > 0.5 .
isLastTermIn(X, M, Tg):- lastTerm(X, MuX, M, Tg), MuX >= 0.5 .

% *********************
% Extraversion function
% *********************

estimateExtraversion(X, 0, M, Tg):- isFirstTerm(X, M - 2 / Tg, Tg), !.
estimateExtraversion(X, 1, M, Tg):- isMiddleTerm(X, M - 1 / Tg, Tg), !.
estimateExtraversion(X, 2, M, Tg):- isMiddleTermIn(X, M, Tg), !.
estimateExtraversion(X, 3, M, Tg):- isMiddleTerm(X, M + 1 / Tg, Tg), !.
estimateExtraversion(X, 4, M, Tg):- isLastTerm(X, M + 2 / Tg, Tg). 

% *******************
% Neuroticism function
% *******************

estimateNeuroticism(Y, 0, M, Tg):- isFirstTermIn(Y, M - 2 / Tg, Tg), !.
estimateNeuroticism(Y, 1, M, Tg):- isMiddleTerm(Y, M - 1 / Tg, Tg), !.
estimateNeuroticism(Y, 2, M, Tg):- isMiddleTermIn(Y, M, Tg), !.
estimateNeuroticism(Y, 3, M, Tg):- isLastTerm(Y, M + 1 / Tg, Tg).

% *******************
% Lie function
% *******************

estimateLie(Z, 0, M, Tg):- isFirstTermIn(Z, 4 - 1, 0.5), !.
estimateLie(Z, 1, M, Tg):- isLastTerm(Z, 4 + 1, 0.5), !.

% *******************
% Result
% *******************

determineTypeWrapper(X, Mx, TgX, Y, My, TgY, R):- estimateExtraversion(X, MuX, Mx, TgX), estimateNeuroticism(Y, MuY, My, TgY), determineType(MuX, MuY, R).
determineType(MuX, MuY, 'Phlegmatic'):- (MuX == 0; MuX == 1; MuX == 2), (MuY == 0; MuY == 1).
determineType(MuX, MuY, 'Melancholic'):- (MuX == 0; MuX == 1; MuX == 2), (MuY == 2; MuY == 3).
determineType(MuX, MuY, 'Sanguine'):- (MuX == 3; MuX == 4), (MuY ==0; MuY == 1).
determineType(MuX, MuY, 'Choleric'):- (MuX == 3; MuX == 4), (MuY ==2; MuY == 3).

result(X, Mx, TgX, Y, My, TgY, Z, Mz, TgZ, R):- estimateLie(Z, MuZ, Mz, TgZ), MuZ == 0, determineTypeWrapper(X, Mx, TgX, Y, My, TgY, R), !.
result(X, Mx, TgX, Y, My, TgY, Z, Mz, TgZ, S):- determineTypeWrapper(X, Mx, TgX, Y, My, TgY, R),  string_concat(R, ' (Result might be wrong)', S).