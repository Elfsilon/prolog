% *******************
% Extraversion function
% *******************

estimateExtraversion(X, 0, M, Tg):- K is M - 2 / Tg, isDeepIntroversion(X, K, Tg), !.
estimateExtraversion(X, 1, M, Tg):- K is M - 1 / Tg, isIntroversion(X, K, Tg), !.
estimateExtraversion(X, 2, M, Tg):- isLowIntroversion(X, M, Tg), !.
estimateExtraversion(X, 3, M, Tg):- K is M + 1 / Tg, isExtraversion(X, K, Tg), !.
estimateExtraversion(X, 4, M, Tg):- K is M + 2 / Tg, isHighExtraversion(X, K, Tg), !.

% 7 11 13 17 21
% Deep Introversion   
extDeepInt(X, 0, M, Tg):- X >= M + 1 / Tg, !.
extDeepInt(X, 1, M, Tg):- X >= 0, X < M, !.
extDeepInt(X, MuX, M, Tg):- X >= M, X < M + 1 / Tg, MuX is -((X - (M - 1 / Tg)) / 2) + 1.
isDeepIntroversion(X, M, Tg):- extDeepInt(X, MuX, M, Tg), MuX > 0.5 .

% Introversion
extInt(X, 0):- X >= 0, X < 7; X >= 13, !.
extInt(X, MuX):- X >= 7, X < 11, MuX is (X - 7) / 4, !.
extInt(X, MuX):- X >= 11, X < 13, MuX is -((X - 11) / 2) + 1.
isIntroversion(X):- extInt(X, MuX), MuX >= 0.5 .

% Low Introversion
extLowInt(X, 0):- X >= 0, X < 11; X >= 17, !.
extLowInt(X, MuX):- X >= 11, X < 13, MuX is (X - 11) / 2.
extLowInt(X, MuX):- X >= 13, X < 17, MuX is -((X - 13) / 4) + 1.
isLowIntroversion(X):- extLowInt(X, MuX), MuX > 0.5 .

% Extraversy
extExt(X, 0):- X >= 0, X < 13; X >= 21, !.
extExt(X, MuX):- X >= 13, X < 17, MuX is (X - 13) / 4.
extExt(X, MuX):- X >= 17, X < 21, MuX is -((X - 17) / 4) + 1.
isExtraversion(X):- extExt(X, MuX), MuX >= 0.5 .

% High Extraversy
extHighExt(X, 0):- X >= 0, X < 17, !.
extHighExt(X, 1):- X >= 21, !.
extHighExt(X, MuX):- X >= 17, X < 21, MuX is (X - 17) / 4.
isHighExtraversion(X):- extHighExt(X, MuX), MuX > 0.5 .

% *******************
% Neuroticism function
% *******************

estimateNeuroticism(Y, 0):-       isLowNeuroticism(Y),      !.
estimateNeuroticism(Y, 1):-   isAvgNeuroticism(Y),      !.
estimateNeuroticism(Y, 2):-      isHighNeuroticism(Y),     !.
estimateNeuroticism(Y, 3):- isVeryHighNeuroticism(Y), !.

% 8 10 12 14 18 20
% Low neuro
neuroLow(Y, 1):- Y >= 0, Y < 8, !.
neuroLow(Y, 0):- Y >= 10, !.
neuroLow(Y, MuY):- Y >= 8, Y < 10, MuY is -((Y - 8) / 2) + 1.
isLowNeuroticism(Y):- neuroLow(Y, MuY), MuY > 0.5 .

% Avg neuro
neuroAvg(Y, 0):- Y >= 0, Y < 8; Y >= 14, !.
neuroAvg(Y, 1):- Y >= 10, Y < 12, !.
neuroAvg(Y, MuY):- Y >= 8, Y < 10, MuY is (Y - 8) / 2, !.
neuroAvg(Y, MuY):- Y >= 12, Y < 14, MuY is -((Y - 12) / 2) + 1.
isAvgNeuroticism(Y):- neuroAvg(Y, MuY), MuY >= 0.5 .

% High neuro
neuroHigh(Y, 0):- Y >= 0, Y =< 12; Y >= 20, !.
neuroHigh(Y, 1):- Y >= 14, Y < 18, !.
neuroHigh(Y, MuY):- Y >= 12, Y < 14, MuY is (Y - 12) / 2, !.
neuroHigh(Y, MuY):- Y >= 18, Y < 20, MuY is -((Y - 18) / 2) + 1.
isHighNeuroticism(Y):- neuroHigh(Y, MuY), MuY > 0.5 .

% Very high neuro
neuroVeryHigh(Y, 0):- Y >= 0, Y < 18, !.
neuroVeryHigh(Y, 1):- Y >= 20, !.
neuroVeryHigh(Y, MuY):- Y >= 18, Y < 20, MuY is (Y - 18) / 2, !.
isVeryHighNeuroticism(Y):- neuroVeryHigh(Y, MuY), MuY >= 0.5 .

% *******************
% Lie function
% *******************

estimateLie(Z, 0):-  isLowLie(Z),  !.
estimateLie(Z, 1):- isHighLie(Z), !.

% Low lie level
lieLow(Z, 0):- Z >= 8, !.
lieLow(Z, MuZ):- Z >= 0, Z < 8, MuZ is -(Z / 8) + 1.
isLowLie(Z):- lieLow(Z, MuZ), MuZ >= 0.5 .

% High lie level
lieHigh(Z, 1):- Z >= 8, !.
lieHigh(Z, MuZ):- Z >= 0, Z < 8, MuZ is Z / 8.
isHighLie(Z):- lieHigh(Z, MuZ), MuZ > 0.5 .

% *******************
% Result
% *******************

determineTypeWrapper(X, Y, R):- estimateExtraversion(X, MuX), estimateNeuroticism(Y, MuY), determineType(MuX, MuY, R).
determineType(MuX, MuY, 'Phlegmatic'):- (MuX == 0; MuX == 1; MuX == 2), (MuY == 0; MuY == 1).
determineType(MuX, MuY, 'Melancholic'):- (MuX == 0; MuX == 1; MuX == 2), (MuY == 2; MuY == 3).
determineType(MuX, MuY, 'Sanguine'):- (MuX == 3; MuX == 4), (MuY ==0; MuY == 1).
determineType(MuX, MuY, 'Choleric'):- (MuX == 3; MuX == 4), (MuY ==2; MuY == 3).

result(X,Y,Z,R):- estimateLie(Z, MuZ), MuZ == 0, determineTypeWrapper(X,Y,R), !.
result(X,Y,Z,S):- estimateLie(Z, MuZ), MuZ == 1, determineTypeWrapper(X,Y,R),  string_concat(R, ' (Result might be wrong)', S).