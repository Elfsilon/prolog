:- use_module(library(http/http_server)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).
:- http_handler(/, handler(M), [method(M), methods([get]), time_limit(10000)]).

:- [test2].

server:- http_server(http_dispatch, [port(4040)]).

handler(get, Req) :-
    X is 3,
    format('Hello ~d', [X]).
    % http_parameters(Req, [
    %     val(Number, [integer])
    % ]),
    % json_write(JsonOut, point{number: Number}),
    % reply_json_dict(JsonOut).
