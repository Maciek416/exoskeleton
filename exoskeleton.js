/**
 *  exoskeleton.js - Useful support for Backbone.js
 *
 *  Created by Maciej Adwent http://github.com/Maciek416
 *  Created by Corban Brook http://github.com/corbanbrook
 *
 */

/*
 *  MIT LICENSE
 *
 *  Copyright (c) 2011 Maciej Adwent, Corban Brook
 *
 *  Permission is hereby granted, free of charge, to any person obtaining
 *  a copy of this software and associated documentation files (the
 *  "Software"), to deal in the Software without restriction, including
 *  without limitation the rights to use, copy, modify, merge, publish,
 *  distribute, sublicense, and/or sell copies of the Software, and to
 *  permit persons to whom the Software is furnished to do so, subject to
 *  the following conditions:
 *
 *  The above copyright notice and this permission notice shall be
 *  included in all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 *  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 *  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 *  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 *  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 *  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 *  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

/**
 * Usage:
 *
 *    Exoskeleton.init(Backbone);
 *
 */

var Exoskeleton = {

  init: function(Backbone){
    var self = this;

    // Memoize original `extend` from `Backbone.Model`
    var _extend = Backbone.Model.extend;

    Backbone.Model.extend = function(){

      // memoize original initialize function if it exists
      var _initialize;

      // Evil initializer
      var init = function(){
        
        if(this.resourceId){
          self.resourceId(this, this.resourceId);
        }

        if(this.fields){
          self.addFieldAccessors(this);
        }

        if(typeof(_initialize)==='function'){
          _initialize.apply(this, arguments);
        }
      };

      // remap any initialize we see with our own
      _(arguments).each(function(map){
        if(map && typeof(map.initialize)=='function'){
          // memoize original initialize
          _initialize = map.initialize;
          // remap to evil initializer
          map.initialize = init;
        }
      });

      return _extend.apply(Backbone.Model, arguments);
    };

  },


  // Remap `model`'s id attribute name, ie mongodb's `_id`, to `attr`
  resourceId: function(model, attr) {
    Object.defineProperty(model, "id", {
      get: function() {
        return model.get(attr);
      },
      set: function(id) {
        var attributes = {};
        attributes[attr] = id;
        model.set(attributes);
      }
    });
  },


  // Generate attr accessors for `model` field names in `fields`
  addFieldAccessors: function(model, fields) {
    fields || (fields = model.fields);

    for (var i in fields) {
      var attr = fields[i];
      (function(self, attr) {
        if (attr in self) {
          throw "Can not create accessor for the field " + attr + ". Already exists in model.";
        }
        Object.defineProperty(self, attr, {
          get: function() {
            return self.get(attr);
          },
          set: function(value) {
            var attributes = {};
            attributes[attr] = value;
            self.set(attributes);
          }
        });
      }(model, attr));
    }
  }

};