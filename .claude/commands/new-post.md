# Create New Blog Post

You are tasked with creating a new blog post for this Hugo site.

## Process

1. **Get post details from user arguments:**
   - First argument: slug (required) - will be normalized to lowercase with hyphens
   - Second argument: title (optional) - if not provided, generate from slug
   - Extract these from the command arguments provided

2. **Normalize the slug:**
   - Convert to lowercase
   - Replace spaces and special characters with hyphens
   - Remove leading/trailing hyphens
   - German umlauts should be converted: ä→a, ö→o, ü→u, ß→ss
   - Example: "Mein erster Post!" → "mein-erster-post"

3. **Generate title if not provided:**
   - Convert slug to title case
   - Replace hyphens with spaces
   - Capitalize first letter of each word
   - Example: "mein-erster-post" → "Mein Erster Post"

4. **Check if post already exists:**
   - Directory path: `content/blog/{slug}/`
   - If directory exists, inform user and exit (don't overwrite)

5. **Create the blog post:**
   - Create directory: `content/blog/{slug}/`
   - Create file: `content/blog/{slug}/index.md`
   - Use current date/time in ISO 8601 format with timezone
   - Set `draft: true` by default

6. **Post template:**
   ```markdown
   ---
   title: "{title}"
   date: {current-datetime}
   draft: true
   ---

   Schreibe hier deinen Beitrag...

   ## Überschrift 1

   Dein Inhalt...

   ## Überschrift 2

   Mehr Inhalt...
   ```

7. **Confirm creation:**
   - Show the full path to the created post
   - Provide next steps:
     - Edit the post
     - Add images to the same directory
     - Set `draft: false` when ready to publish
     - Test with `hugo server -D` (to see drafts)

## Important Guidelines

- **Language**: Content template should be in German (this is a German blog)
- **Date format**: Use ISO 8601 with timezone (e.g., `2025-01-11T10:30:00+01:00`)
- **Draft mode**: Always create posts as drafts initially
- **Page bundles**: Hugo uses page bundles - the post directory can contain images and other assets
- **Slug validation**: Ensure slug contains only lowercase letters, numbers, and hyphens

## Example Usage

**User command**: `/new-post hugo-tutorial "Hugo Tutorial für Anfänger"`

**Expected behavior**:
1. Normalize slug: `hugo-tutorial`
2. Use provided title: "Hugo Tutorial für Anfänger"
3. Create: `content/blog/hugo-tutorial/index.md`
4. Populate with template and frontmatter
5. Confirm with user

**User command**: `/new-post meine-gedanken`

**Expected behavior**:
1. Normalize slug: `meine-gedanken`
2. Generate title: "Meine Gedanken"
3. Create: `content/blog/meine-gedanken/index.md`
4. Populate with template and frontmatter
5. Confirm with user

## Error Handling

- **No slug provided**: Inform user that slug is required
  - Show usage: `/new-post <slug> [title]`
  - Provide example
- **Post already exists**: Inform user and show existing directory path
- **Invalid slug**: If slug normalizes to empty string, reject and ask for valid slug

## Hugo Configuration Notes

- Blog posts go in: `content/blog/`
- Using page bundles (directory with `index.md`)
- Permalinks use slug: `/:slug/` (see hugo.toml)
- Default language: German (de-DE)
- Draft posts only visible with: `hugo server -D`

## After Creation

Inform the user:
```
✓ Blog post created successfully!

Location: content/blog/{slug}/index.md

Next steps:
1. Edit the post: content/blog/{slug}/index.md
2. Add images to: content/blog/{slug}/
3. When ready, set draft: false
4. Test with: hugo server -D (to see drafts)
```

## IMPORTANT

- Use the Write tool to create the file (don't use bash/echo)
- Always use forward slashes in paths
- Check if directory exists before creating
- Don't open in editor automatically (just create and inform)
