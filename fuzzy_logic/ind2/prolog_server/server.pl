:- use_module(library(http/http_server)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).
:- http_handler(/, handler(M), [method(M), methods([get]), time_limit(10000)]).

:- [fuzzy_system].

server:- http_server(http_dispatch, [port(4040)]).

handler(get, Req) :-
    http_parameters(Req, [
        x(X, [integer]),
        y(Y, [integer]),
        z(Z, [integer]),
        mx(MX, [float]),
        my(MY, [float]),
        mz(MZ, [float]),
        tgx(TgX, [float]),
        tgy(TgY, [float]),
        tgz(TgZ, [float])
    ]),
    detResult(X, MX, TgX, Y, MY, TgY, Z, MZ, TgZ, Type),
    reply_json_dict(res{type: Type}).
