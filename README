Exoskeleton
===========

To initialize Exoskeleton, call:

    Exoskeleton.init(Backbone);

This will ensure that Exoskeleton's supports are loaded.


Model Supports
--------------

Exoskeleton currently has two types of supports that are added to models, attribute accessors and resource attribute (id) re-routing.


Attribute Accessors
-------------------

Exoskeleton allows you to define a set of fields that can be accessed with less syntax, allowing you to replace

    person.get("first_name")

with a much shorter

    person.first_name

To define a set of fields to be accessed in this manner, just add them to a fields list like this:

    var Person = Backbone.Model.extend({ fields: ["first_name", "last_name", "phone_number"] });


Resource Attribute Routing
--------------------------

Backbone Models prefer that you have a id attribute on your JSON objects, so it can be annoying if your attribute is named something else, like _id. Exoskeleton can remap your resource attribute for you so that all of Backbone's functions still work correctly and you can just use id throughout your Backbone application source.

For example, to remap the attribute "person_id" to Backbone's "id", define your model like this:

    var Person = Backbone.Model.extend({ resourceId: "person_id" });

