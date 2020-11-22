:- use_module(library(http/http_server)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).
:- http_handler(/, handler(M), [method(M), methods([get]), time_limit(10000)]).

:- ["prolog/akinator.pl"].

server:- http_server(http_dispatch, [port(4040)]).

handler(get, Req) :-
    http_parameters(Req, [
        pop(Pop, [string]),
        graph(Graph, [string]),
        search(Search, [string]),
        web(Web, [string]),
        sortir(Sort, [string]),
        opt(Opt, [string]),
        crypto(Crypto, [string]),
        life(Life, [string]),
        hash(Hash, [string]),
        nonrec(Nonrecom, [string]),
        mach(MLearning, [string])
    ]),

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

    guess(IntPop, IntGraph, IntSearch, IntWeb, IntSort, IntOpt, IntCrypto, IntLife, IntHash, IntNonrecom, IntMLearning, Answer),
    reply_json_dict(res{answer: Answer}).