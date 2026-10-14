<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Funnel architecture
- Use the three TanStack page routes for the sales, checkout and manual-payment flow; this keeps the requested funnel simple without a backend or automated payment claims.
- Pass only validated optional-product selections and a visual order code through payment search parameters; personal inputs remain transient in checkout and are not stored or placed in URLs.
- Keep business rules in the browser-safe funnel module and CTA timing in its dedicated hook, with concrete tests for prices, delay and payment details.
- Keep reference-matching visual roles and responsive rules in the global design system, and reference supplied images through Lovable Assets pointers.
- Keep the clearly labeled demonstration countdown in an isolated browser hook without storage or checkout effects; simulated timing must not become a commercial expiry rule.
