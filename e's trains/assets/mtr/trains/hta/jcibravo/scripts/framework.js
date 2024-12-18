/* 
=================================================
Script for modular system for NTE's script system
=================================================
As NTE uses the same variable context for each
script in a script_files[], just putting separate
scripts there would make them conflict with each
other. This script as a framework that would
solve that.

USAGE:
1. Put this script in the beginning of scripts list:
"script_files": ["mtr:metropack/scripts/framework.js", "mtr:metropack/scripts/script1.js", "mtr:metropack/scripts/script2.js", ...]

2. Change all scripts to use following syntax:
create_queue.push(function (ctx, state, train) {});
dispose_queue.push(function (ctx, state, train) {});
render_queue.push(function (ctx, state, train) {});

© WerySkok 
*/

var create_queue = [];
var dispose_queue = [];
var render_queue = [];

function create(ctx, state, train) {
    for (let i = 0; i < create_queue.length; i++) {
        create_queue[i](ctx, state, train);
    }
}

function dispose(ctx, state, train) {
    for (let i = 0; i < dispose_queue.length; i++) {
        dispose_queue[i](ctx, state, train);
    }
}

function render(ctx, state, train) {
    for (let i = 0; i < render_queue.length; i++) {
        render_queue[i](ctx, state, train);
    }
}
