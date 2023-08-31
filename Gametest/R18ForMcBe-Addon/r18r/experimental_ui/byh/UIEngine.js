/// “引擎”模块包含UI和游戏/应用程序之间通信的所有功能。
(function (factory) {
	if (typeof module === 'object' && module.exports) {
		module.exports = factory(global, global.engine, false);
	} else {
		engine = factory(this, engine, true);
	}
})(function (global, engine, hasOnLoad) {
	'use strict';

	var VERSION = [1, 5, 0, 8];

	/**
	* 事件发射器
	*
	* @class 发射器
	*/


	function Emitter() {
		this.events = {};
	}

	function Handler(code, context) {
		this.code = code;
		this.context = context;
	}



	Emitter.prototype._createClear = function (object, name, handler) {
		return function() {
			var handlers = object.events[name];
			if (handlers) {
				var index = -1;
				// 这是用以前本地的？？？？
				if(handler === undefined)
				{
					for(var i = 0; i < handlers.length; ++i)
					{
						if(handlers[i].wasInCPP !== undefined)
						{
							index = i;
							break;
						}
					}
				}
				else
				{
					index = handlers.indexOf(handler);
				}
				if (index != -1) {
					handlers.splice(index, 1);
					if (handlers.length === 0) {
						delete object.events[name];
					}
				}
			} else {
				if(engine.RemoveOnHandler !== undefined) {
					engine.RemoveOnHandler(name);
				}
			}
		};
	};

	/**
	*为事件添加处理程序
	*
	*@method on
	*@param name the event name
	*@param callback 触发事件时要调用的
	*@param context 此绑定用于执行处理程序，默认为发射器
	*@return 连接对象
	*/

	Emitter.prototype.on = function (name, callback, context) {
		var handlers = this.events[name];
		if (handlers === undefined)
			handlers = this.events[name] = [];

		var handler = new Handler(callback, context || this);
		handlers.push(handler);
		return { clear: this._createClear(this, name, handler) };
	};
	
	/**
	*从事件中移除处理程序
	*
	*@method off
	*@param name the event name
	*触发事件时要调用的@param回调函数
	*@param context 此绑定用于执行处理程序，默认为发射器
	*@retucn 连接对象
	*/
	Emitter.prototype.off = function (name, handler, context) {
		var handlers = this.events[name];

		if (handlers !== undefined) {
			context = context || this;

			var index;
			var length = handlers.length;
			for (index = 0; index < length; ++index) {
				var reg = handlers[index];
				if (reg.code == handler && reg.context == context) {
					break;
				}
			}
			if (index < length) {
				handlers.splice(index, 1);
				if (handlers.length === 0) {
					delete this.events[name];
				}
			}
		}
		else
		{
			engine.RemoveOnHandler(name);
		}
	};


	var isAttached = engine !== undefined;
	engine = engine || {};
	///{布尔}发动机。已连接
	///指示脚本当前是否在UI引擎内运行
	engine.isAttached = isAttached;

	engine.onEventsReplayed = null;
	Emitter.prototype.trigger = function(name) {
		var handlers = this.events[name];

		if (handlers !== undefined) {
			var args = Array.prototype.slice.call(arguments, 1);

			handlers.forEach(function (handler) {
				handler.code.apply(handler.context, args);
			});
		}
	};

	Emitter.prototype.merge = function (emitter) {
		var lhs = this.events,
			rhs = emitter.events,
			push = Array.prototype.push,
			events;

		for (var e in rhs) {
			events = lhs[e] = lhs[e] || [];
			push.apply(events, rhs[e]);
		}
	};

	var pending = 'pending';
	var fulfilled = 'fulfilled';
	var broken = 'broken';

	function callAsync(code, context, argument) {
		var async = function () {
			code.call(context, argument);
		};
		setTimeout(async, 1);
	}

	function Promise () {
		this.emitter = new Emitter();
		this.state = pending;
		this.result = null;
	}

	Promise.prototype.resolve = function (result) {
		this.state = fulfilled;
		this.result = result;

		this.emitter.trigger(fulfilled, result);
	};

	Promise.prototype.reject = function (result) {
		this.state = broken;
		this.result = result;

		this.emitter.trigger(broken, result);
	};

	Promise.prototype.success = function (code, context) {
		if (this.state !== fulfilled) {
			this.emitter.on(fulfilled, code, context);
		} else {
			callAsync(code, context || this, this.result);
		}
		return this;
	};

	Promise.prototype.always = function (code, context) {
		this.success(code, context);
		this.otherwise(code, context);
		return this;
	};

	Promise.prototype.otherwise = function (code, context) {
		if (this.state !== broken) {
			this.emitter.on(broken, code, context);
		} else {
			callAsync(code, context || this, this.result);
		}
		return this;
	};

	Promise.prototype.merge = function (other) {
		if (this.state === pending) {
			this.emitter.merge(other.emitter);
		} else {
			var handlers = other.emitter.events[this.state];
			var self = this;
			if (handlers !== undefined) {
				handlers.forEach(function (handler) {
					handler.code.call(handler.context, self.result);
				});
			}
		}
	};

	Promise.prototype.make_chain = function (handler, promise, ok) {
		return function (result) {
			var handlerResult;
			try {
				handlerResult = handler.code.call(handler.context, result);
				if (handlerResult instanceof Promise) {
					handlerResult.merge(promise);
				} else if (this.state === ok) {
					promise.resolve(handlerResult);
				} else {
					promise.reject(handlerResult);
				}
			} catch (error) {
				promise.reject(error);
			}
		};
	};

	function makeDefaultHandler(promise) {
		return function () {
			return promise;
		};
	}

	
	Promise.prototype.then = function (callback, errback) {
		var promise = new Promise();

		var handler = new Handler(callback || makeDefaultHandler(this), this);

		this.success(this.make_chain(handler, promise, fulfilled), this);

		var errorHandler = new Handler(errback || makeDefaultHandler(this), this);
		this.otherwise(this.make_chain(errorHandler, promise, broken), this);


		return promise;
	};

	if (!engine.isAttached) {
		Emitter.prototype.on = function (name, callback, context) {
			var handlers = this.events[name];
			if (this.browserCallbackOn) {
				this.browserCallbackOn(name, callback, context);
			}

			if (handlers === undefined) {
				handlers = this.events[name] = [];
			}

			var handler = new Handler(callback, context || this);
			handlers.push(handler);
			return { clear: this._createClear(this, name, handler) };
		};
		Emitter.prototype.off = function (name, handler, context) {
			var handlers = this.events[name];

			if (handlers !== undefined) {
				context = context || this;

				var index;
				var length = handlers.length;
				for (index = 0; index < length; ++index) {
					var reg = handlers[index];
					if (reg.code == handler && reg.context == context) {
						break;
					}
				}
				if (index < length) {
					handlers.splice(index, 1);
					if (handlers.length === 0) {
						delete this.events[name];

						if (this.browserCallbackOff) {
							this.browserCallbackOff(name, handler, context);
						}
					}
				}
			}
		};

		engine.SendMessage = function (name, id) {
			var args = Array.prototype.slice.call(arguments, 2);
			var deferred = engine._ActiveRequests[id];

			delete engine._ActiveRequests[id];
			var call = function () {
				var mock = engine._mocks[name];

				if (mock !== undefined) {
					deferred.resolve(mock.apply(engine, args));
				}
			};

			window.setTimeout(call, 16);
		};

		engine.TriggerEvent = function () {
			var args = Array.prototype.slice.call(arguments);

			var trigger = function () {
				var mock = engine._mocks[args[0]];

				if (mock !== undefined) {
					mock.apply(engine, args.slice(1));
				}
			};
			window.setTimeout(trigger, 16);
		};

		engine.BindingsReady = function () {
			engine._OnReady();
		};

		engine.__observeLifetime = function () {
		};

		engine.beginEventRecording =
		engine.endEventRecording =
		engine.saveEventRecord = function() {
			console.warning("Event recording will not work in the browser!");
		};

		engine._mocks = {};
		engine._mockImpl = function (name, mock, isCppCall, isEvent) {
			if (mock) {
				this._mocks[name] = mock;
			}
			// 从中提取参数的名称Function.prototype.toString函数
			var functionStripped = mock.toString().replace("function " + mock.name + "(", "");
			var rightParanthesis = functionStripped.indexOf(")");
			var args = functionStripped.substr(0, rightParanthesis);
			if (this.browserCallbackMock) {
				this.browserCallbackMock(name,
										 args,
										 isCppCall,
										 Boolean(isEvent));
			}
		}
		engine.mock = function (name, mock, isEvent) {
			this._mockImpl(name, mock, true, isEvent);
		};
	}

	engine.events = {};
	for (var property in Emitter.prototype) {
		engine[property] = Emitter.prototype[property];
	}

	if (engine.isAttached) {
		engine.on = function (name, callback, context) {
			var handlers = this.events[name];

			if (handlers === undefined && engine.AddOrRemoveOnHandler !== undefined) {
				// 检查缓存处理程序的位置
				var prevEvent = engine.AddOrRemoveOnHandler(name, callback, context || engine);

				// 在C++中缓存的处理程序
				if(prevEvent === undefined) {
					return { clear: this._createClear(this, name, undefined) };
				}

				handlers = this.events[name] = [];

				// 添加上一个处理程序
				var prevHandler = new Handler(prevEvent[0], prevEvent[1] || this);
				prevHandler.wasInCPP = true;
				handlers.push(prevHandler);
			} else if (handlers === undefined) {
				handlers = this.events[name] = [];
			}

			var handler = new Handler(callback, context || this);
			handlers.push(handler);
			return { clear: this._createClear(this, name, handler) };
		}
	}

	///@功能发动机打开
	///和事件的注册处理程序
	///@param{String}name事件的名称
	///触发事件时要执行的@param{Function}回调函数
	///@param context*此*函数的上下文，默认为引擎对象
	///@功能发动机。开始腹侧记录
	///开始记录游戏中使用View:：TriggerEvent触发的所有事件
	///@功能发动机。endEventRecording
	///结束事件录制
	///@功能引擎.saveEventRecord
	///保存上次调用之间记录的事件发动机。开始腹侧记录以及发动机。endEventRecording到一个文件
	///@param{String}path保存记录事件的文件的路径。可选。默认为“事件记录.json"
	///@功能发动机更换事件
	///重放先前记录和存储在路径中的事件。如果您需要在所有事件发生时收到通知
	///分配一个回调引擎.onEventsReplayed
	///@param{Number}timeScale重放事件的速度（例如，通过2将速度加倍）。可选。默认为1。
	///@param{String}path存储记录事件的文件的路径。可选。默认为“事件记录.json"
	///@功能发动机关闭
	///删除事件的处理程序
	///@param{String}name事件的名称，默认情况下删除所有事件
	///@param{Function}回调要删除的回调函数，默认情况下删除给定事件的所有回调
	///@param context*this*context对于函数，默认情况下全部删除所有回调，而不管上下文如何
	///@warning删除“engine”的所有处理程序将删除一些*一致的UI*内部事件，从而破坏某些功能。
	///@功能发动机.触发器
	///触发事件
	///此函数将触发为该事件注册的任何C++处理程序，其为：CONT:：UI:VIEW:RealStestFor事件
	///@param{String}name事件的名称
	///@参数。。。要传递给事件处理程序的任何额外参数

	engine._trigger = Emitter.prototype.trigger;
	var concatArguments = Array.prototype.concat;
	engine.trigger = function (name) {
		this._trigger.apply(this, arguments);
		this.TriggerEvent.apply(this, arguments);

		if (this.events['all'] !== undefined) {
			var allArguments = concatArguments.apply(['all'], arguments);
			this._trigger.apply(this, allArguments);
		}
	};

	///@功能引擎.showOverlay
	///在浏览器中显示调试覆盖。
	///仅在浏览器中有效。尝试在一致的UI中使用它将不会起任何作用。
	engine.showOverlay = function () {};


	///@功能引擎.hideOverlay
	///在浏览器中隐藏调试覆盖。
	///仅在浏览器中有效。尝试在一致的UI中使用它将不会起任何作用。
	engine.hideOverlay = function () {};

	///@功能发动机.模拟
	//用指定的函数模拟C++函数调用。
	///仅在浏览器中有效。尝试在一致的UI中使用它将不会起任何作用。
	///@param{String}name事件的名称
	///@param{Function}模拟要调用的函数来代替本机绑定
	///@param{Boolean}无论您是模拟事件调用还是函数调用，都将显示该事件
	if (engine.isAttached) {
		engine.mock = function (name, mock, isEvent) { };
	}

	engine._BindingsReady = false;
	engine._WindowLoaded = false;
	engine._RequestId = 0;
	engine._ActiveRequests = {};

	///@功能引擎.createDeferred
	///创建新的延迟对象。
	///使用此选项创建可与一起使用的延迟/承诺`引擎。呼叫`.
	///@return{Deferred}一个新的延迟对象
	///@see@ref定制承诺
	engine.createDeferred = (global.engineCreateDeferred === undefined) ?
		function () { return new Promise(); }
		: global.engineCreateDeferred;

	
	///@功能引擎。呼叫
	///异步调用C++处理程序并检索结果
	///C++处理程序必须已注册为“CONT::UI:VIEW::bDICALL”	调用的C++处理程序的
	///@ PARAM {String }名称
	///@参数 ... 传递给C++处理程序的任何额外参数
	///@返回{延迟}延迟对象，其承诺是用C++处理程序的结果解析的
	engine.call = function () {
		engine._RequestId++;
		var id = engine._RequestId;

		var deferred = engine.createDeferred();
		engine._ActiveRequests[id] = deferred;
		var messageArguments = Array.prototype.slice.call(arguments);
		messageArguments.splice(1, 0, id);
		engine.SendMessage.apply(this, messageArguments);
		return deferred;
	};

	engine._Result = function (requestId) {
		var deferred = engine._ActiveRequests[requestId];
		if (deferred !== undefined)
		{
			delete engine._ActiveRequests[requestId];

			var resultArguments = Array.prototype.slice.call(arguments);
			resultArguments.shift();
			deferred.resolve.apply(deferred, resultArguments);
		}
	};

	engine._Errors = [ 'Success', 'ArgumentType', 'NoSuchMethod', 'NoResult' ];

	engine._ForEachError = function (errors, callback) {
		var length = errors.length;

		for (var i = 0; i < length; ++i) {
			callback(errors[i].first, errors[i].second);
		}
	};

	engine._MapErrors = function (errors) {
		var length = errors.length;

		for (var i = 0; i < length; ++i) {
			errors[i].first = engine._Errors[errors[i].first];
		}
	};

	engine._TriggerError = function (type, message) {
		engine.trigger('Error', type, message);
	};

	engine._OnError = function (requestId, errors) {
		engine._MapErrors(errors);

		if (requestId === null || requestId === 0) {
			engine._ForEachError(errors, engine._TriggerError);
		}
		else {
			var deferred = engine._ActiveRequests[requestId];

			delete engine._ActiveRequests[requestId];

			deferred.reject(errors);
		}
	};

	engine._eventHandles = {};

	engine._Register = function (eventName) {
		var trigger = (function (name, engine) {
			return function () {
				var eventArguments = [name];
				eventArguments.push.apply(eventArguments, arguments);
				engine.TriggerEvent.apply(this, eventArguments);
			};
		}(eventName, engine));

		engine._eventHandles[eventName] = engine.on(eventName, trigger);
	};

	engine._removeEventThunk = function (name) {
		var handle = engine._eventHandles[name];
		handle.clear();
		delete engine._eventHandles[name];
	};

	engine._Unregister = function (name) {
		if (typeof name === 'string') {
			engine._removeEventThunk(name);
		} else {
			name.forEach(engine._removeEventThunk, engine);
		}
	};

	function createMethodStub(name) {
		var stub = function() {
			var args = Array.prototype.slice.call(arguments);
			args.splice(0, 0, name, this._id);
			return engine.call.apply(engine, args);
		};
		return stub;
	}

	engine._boundTypes = {};

	engine._createInstance = function (args) {
		var type = args[0],
			id = args[1],
			methods = args[2],
			constructor = engine._boundTypes[type];

		if (constructor === undefined) {
			constructor = function (id) {
				this._id = id;
			};
			constructor.prototype.__Type = type;
			methods.forEach(function (name) {
				constructor.prototype[name] = createMethodStub(type + '_' + name);
			});
			engine._boundTypes[type] = constructor;
		}

		var instance = new constructor(id);
		engine.__observeLifetime(instance);
		return instance;
	}

	engine._OnReady = function () {
		engine._BindingsReady = true;
		if (engine._WindowLoaded) {
			engine.trigger('Ready');
		}
	};

	engine._OnWindowLoaded = function () {
		engine._WindowLoaded = true;
		if (engine._BindingsReady) {
			engine.trigger('Ready');
		}
	};

	engine._ThrowError = function (error) {
		var prependTab = function (s) { return "\t" + s; };
		var errorString = error.name + ": " + error.message + "\n" +
						  error.stack.split("\n").map(prependTab).join("\n");
		console.error(errorString);
	};

	if (hasOnLoad) {
		global.onload = (function (originalWindowLoaded) {
			return function () {
				if (originalWindowLoaded) {
					originalWindowLoaded();
				}
				engine._OnWindowLoaded();
			};
		}(global.onload));
	} else {
		engine._WindowLoaded = true;
	}

	engine.on('_Result', engine._Result, engine);
	engine.on('_Register', engine._Register, engine);
	engine.on('_Unregister', engine._Unregister, engine);
	engine.on('_OnReady', engine._OnReady, engine);
	engine.on('_OnError', engine._OnError, engine);

    engine.on('__OnReplayRecordCompleted', function(jsonRecords) {
        if (engine.onEventsReplayed) {
            engine.onEventsReplayed();
        }
    });

	engine.BindingsReady(VERSION[0], VERSION[1], VERSION[2], VERSION[3]);

	return engine;
});
