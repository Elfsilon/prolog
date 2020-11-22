:- dynamic popular/2.
:- dynamic graph/2.
:- dynamic search/2.
:- dynamic web/2.
:- dynamic sortir/2.
:- dynamic optimization/2.
:- dynamic crypto/2.
:- dynamic life_termins/2.
:- dynamic hash/2.
:- dynamic nonrecommended/2.
:- dynamic machine_learning/2.

write_list([]):-!.
write_list([H|T]):-write(H), nl, write_list(T).

split_list(ToSplit, Result):- split_list(ToSplit, [], Result).
split_list([], Res, Res).
split_list([H|T], SList, Res):-
    split_string(H, ",", "", Splitted),
    append(SList, [Splitted], NewSList),
    split_list(T, NewSList, Res).

load_database:-
    open("prolog/database.txt", read, Str),
    load_database(Str, Data),
    close(Str),
    split_list(Data, Splitted),
    create_facts(Splitted), !.
load_database(Stream,[]):-
    at_end_of_stream(Stream), !.
load_database(Stream,[X|L]):-
    \+ at_end_of_stream(Stream),
    read(Stream,X),
    load_database(Stream,L), !.

create_facts([H]).
create_facts([[Name, Pop, Graph, Search, Web, Sort, Opt, Crypto, Life, Hash, Nonrecom, MLearning]|T]):-
    number_codes(IntPop, Pop),
    number_codes(IntGraph, Graph),
    number_codes(IntSearch, Search),
    number_codes(IntWeb, Web),
    number_codes(IntSort, Sort),
    number_codes(IntOpt, Opt),
    number_codes(IntCrypto, Crypto),
    number_codes(IntLife, Life),
    number_codes(IntHash, Hash),
    number_codes(IntNonrecom, Nonrecom),
    number_codes(IntMLearning, MLearning),

    asserta(popular(Name, IntPop)),
    asserta(graph(Name, IntGraph)),
    asserta(search(Name, IntSearch)),
    asserta(web(Name, IntWeb)),
    asserta(sortir(Name, IntSort)),
    asserta(optimization(Name, IntOpt)),
    asserta(crypto(Name, IntCrypto)),
    asserta(life_termins(Name, IntLife)),
    asserta(hash(Name, IntHash)),
    asserta(nonrecommended(Name, IntNonrecom)),
    asserta(machine_learning(Name, IntMLearning)),

    create_facts(T).

guess(Pop, Graph, Search, Web, Sort, Opt, Crypto, Life, Hash, Nonrecom, MLearning, Answer):- 
    load_database,
    popular(Answer, Pop), 
    graph(Answer, Graph), 
    search(Answer, Search), 
    web(Answer, Web),
    sortir(Answer, Sort),
    optimization(Answer, Opt),
    crypto(Answer, Crypto),
    life_termins(Answer, Life),
    hash(Answer, Hash),
    nonrecommended(Answer, Nonrecom),
    machine_learning(Answer, MLearning).
guess(_, _, _, _, _, _, _, _, _, _, _, "Dont know").
