import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const author = defineType({
    name: "author",  // Internal name of the schema
    title: 'Author', // Display name in Sanity Studio
    type: 'document', // Specifies it's a document type in Sanity's CMS
    icon: UserIcon, // Uses the `UserIcon` as its icon in the Sanity Studio UI
    fields: [
        defineField({
            name: 'id',
            type: 'number'
        }),
        defineField({
            name: 'name',
            type: 'string'
        }),
        defineField({
            name: 'username',
            type: 'string'
        }),
        defineField({
            name: 'email',
            type: 'string'
        }),
        defineField({
            name: 'image',
            type: 'url'
        }),
        defineField({
            name: 'bio',
            type: 'text'
        })
    ],
    preview: {                  //preview =>Defines how the document is displayed in the Sanity Studio UI.
        select: {               //select =>Specifies which fields should be used in the preview.
            title: "name"       //title: "name" =>Tells Sanity to use the name field as the title when displaying this document in the Studio list.
        }
    }
})