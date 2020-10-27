:- use_module(library(http/http_server)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).
:- http_handler(/,сервис(M), [method(M),methods([get]),time_limit(10000)]).

сервер :- http_server(http_dispatch, [port(8080)]).

сервис(get,Запрос) :-
    http_parameters(Запрос,[val(Число,[integer])]),
    % json_write(current_output, point{x: 1, y: 2}).
    reply_json_dict(point{x: 1, y: 2}).
    % reply_json_dict(JsonOut).
