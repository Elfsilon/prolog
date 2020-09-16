% *******************
% Extraversy function
% *******************

% Deep Intraversy
extDeepInt(X, 0):- X >= 11, !.
extDeepInt(X, 1):- X >= 0, X < 7, !.
extDeepInt(X, MuX):- X >= 7, X < 11, MuX is -((X - 7) / 4) + 1.
isDeepIntraversy(X):- extDeepInt(X, MuX), MuX > 0.5 .

% Intraversy
extInt(X, 0):- X >= 0, X < 7; X >= 13, !.
extInt(X, MuX):- X >= 7, X < 11, MuX is (X - 7) / 4, !.
extInt(X, MuX):- X >= 11, X < 13, MuX is -((X - 11) / 2) + 1.
isIntraversy(X):- extInt(X, MuX), MuX >= 0.5 .

% Low Intraversy
extLowInt(X, 0):- X >= 0, X < 11; X >= 17, !.
extLowInt(X, MuX):- X >= 11, X < 13, MuX is (X - 11) / 2.
extLowInt(X, MuX):- X >= 13, X < 17, MuX is -((X - 13) / 4) + 1.
isLowIntraversy(X):- extLowInt(X, MuX), MuX > 0.5 .

% Extraversy
extExt(X, 0):- X >= 0, X < 13; X >= 21, !.
extExt(X, MuX):- X >= 13, X < 17, MuX is (X - 13) / 4.
extExt(X, MuX):- X >= 17, X < 21, MuX is -((X - 17) / 4) + 1.
isExtraversy(X):- extExt(X, MuX), MuX >= 0.5 .

% High Extraversy
extHighExt(X, 0):- X >= 0, X < 17, !.
extHighExt(X, 1):- X >= 21, !.
extHighExt(X, MuX):- X >= 17, X < 21, MuX is (X - 17) / 4.
isHighExtraversy(X):- extHighExt(X, MuX), MuX > 0.5 .

% *******************
% Neurotism function
% *******************

% Low neuro
neuroLow(Y, 1):- Y >= 0, Y < 8, !.
neuroLow(Y, 0):- Y >= 10, !.
neuroLow(Y, MuY):- Y >= 8, Y < 10, MuY is -((Y - 8) / 2) + 1.
isLowNeurotism(Y):- neuroLow(Y, MuY), MuY > 0.5 .

% Avg neuro
neuroAvg(Y, 0):- Y >= 0, Y < 8; Y >= 14, !.
neuroAvg(Y, 1):- Y >= 10, Y < 12, !.
neuroAvg(Y, MuY):- Y >= 8, Y < 10, MuY is (Y - 8) / 2, !.
neuroAvg(Y, MuY):- Y >= 12, Y < 14, MuY is -((Y - 12) / 2) + 1.
isAvgNeurotism(Y):- neuroAvg(Y, MuY), MuY >= 0.5 .

% High neuro
neuroHigh(Y, 0):- Y >= 0, Y =< 12; Y >= 20, !.
neuroHigh(Y, 1):- Y >= 14, Y < 18, !.
neuroHigh(Y, MuY):- Y >= 12, Y < 14, MuY is (Y - 12) / 2, !.
neuroHigh(Y, MuY):- Y >= 18, Y < 20, MuY is -((Y - 18) / 2) + 1.
isHighNeurotism(Y):- neuroHigh(Y, MuY), MuY > 0.5 .

% Very high neuro
neuroVeryHigh(Y, 0):- Y >= 0, Y < 18, !.
neuroVeryHigh(Y, 1):- Y >= 20, !.
neuroVeryHigh(Y, MuY):- Y >= 18, Y < 20, MuY is (Y - 18) / 2, !.
isVeryHighNeurotism(Y):- neuroVeryHigh(Y, MuY), MuY >= 0.5 .

% *******************
% Lie function
% *******************

% Low lie level
lieLow(Z, 0):- Z >= 8, !.
lieLow(Z, MuZ):- Z >= 0, Z < 8, MuZ is -(Z / 8) + 1.
isLowLie(Z):- lieLow(Z, MuZ), MuZ >= 0.5 .

% High lie level
lieHigh(Z, 1):- Z >= 8, !.
lieHigh(Z, MuZ):- Z >= 0, Z < 8, MuZ is Z / 8.
isHighLie(Z):- lieHigh(Z, MuZ), MuZ > 0.5 .