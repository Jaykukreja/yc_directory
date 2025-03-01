    import { UserIcon } from "lucide-react";
    import { defineField, defineType } from "sanity";

    export const startup = defineType({
        name: "startup",  // Internal name of the schema
        title: 'Startup', // Display name in Sanity Studio
        type: 'document', // Specifies it's a document type in Sanity's CMS
        icon: UserIcon, // Uses the `UserIcon` as its icon in the Sanity Studio UI
        fields: [
            defineField({
                name: 'title',
                type: 'string'
            }),
            defineField({
                name: 'slug',
                type: 'slug',
                options: {
                    source: 'title'
                }
            }),
            defineField({
                name: 'author',
                type: 'reference',
                to: {type: 'author'},
            }),
            defineField({
                name: 'views',
                type: 'number'
            }),
            defineField({
                name: 'description',
                type: 'text'
            }),
            defineField({
                name: 'category',
                type: 'string',
                validation: (Rule) => Rule.min(1).max(20).required().error("Please enter a category")
            }),
            defineField({
                name: 'image',
                type: 'url',
                validation: (Rule) => Rule.required()
            }),
            defineField({
                name: 'pitch',
                type: 'markdown'
            })
        ]
    })